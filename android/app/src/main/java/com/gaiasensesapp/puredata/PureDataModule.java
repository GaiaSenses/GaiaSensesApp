package com.gaiasensesapp.puredata;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.content.res.AssetManager;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.gaiasensesapp.R;

import org.puredata.android.io.AudioParameters;
import org.puredata.android.io.PdAudio;
import org.puredata.android.service.PdService;
import org.puredata.core.PdBase;
import org.puredata.core.PdBaseLoader;
import org.puredata.core.PdListener;
import org.puredata.core.PdReceiver;
import org.puredata.core.utils.IoUtils;
import org.puredata.core.utils.PdDispatcher;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class PureDataModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    private final String TAG = "PureDataModule";

    private PdService pdService = null;
    private boolean wasPlaying = false;

    private final ServiceConnection connection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
            pdService = ((PdService.PdBinder) iBinder).getService();
            Log.i(TAG, "service connected");
            loadLibraries();
        }

        @Override
        public void onServiceDisconnected(ComponentName componentName) {
            // never called
        }
    };

    private final PdReceiver receiver = new PdReceiver() {
        @Override
        public void print(String s) {
            Log.d(TAG, "Pd Print: " + s);
        }

        @Override
        public void receiveBang(String source) {
            Log.d(TAG, "receiveBang source: " + source);
        }

        @Override
        public void receiveFloat(String source, float x) {
            Log.d(TAG, "receiveFloat: source=" + source + " value=" + x);
        }

        @Override
        public void receiveSymbol(String source, String symbol) {
            Log.d(TAG, "receiveSymbol: source=" + source + " symbol=" + symbol);
        }

        @Override
        public void receiveList(String source, Object... args) {
            StringBuilder builder = new StringBuilder();
            builder.append("receiveList: source=")
                    .append(source)
                    .append(" atoms: { ");
            for (Object arg : args) {
                builder.append(arg.toString())
                        .append(" ");
            }
            builder.append("}");
            Log.d(TAG, builder.toString());
        }

        @Override
        public void receiveMessage(String source, String symbol, Object... args) {
            StringBuilder builder = new StringBuilder();
            builder.append("receiveMessage: source=")
                    .append(source)
                    .append(" symbol=")
                    .append(symbol)
                    .append(" atoms: { ");
            for (Object arg : args) {
                builder.append(arg.toString())
                        .append(" ");
            }
            builder.append("}");
            Log.d(TAG, builder.toString());
        }
    };

    public PureDataModule(ReactApplicationContext context) {
        super(context);
        context.addLifecycleEventListener(this);

        // enable low-latency features
        AudioParameters.init(context);

        // create/bind PdService
        Intent intent = new Intent(context, PdService.class);
        context.bindService(intent, connection, Context.BIND_AUTO_CREATE);
    }

    @NonNull
    @Override
    public String getName() {
        return "PureDataModule";
    }

    @Override
    public void onHostResume() {
        Log.i(TAG, "host resumed");
        if (pdService != null && wasPlaying) {
            pdService.startAudio();
        }
    }

    @Override
    public void onHostPause() {
        Log.i(TAG, "host paused");
        if (pdService != null) {
            wasPlaying = pdService.isRunning();
            pdService.stopAudio();
        }
    }

    @Override
    public void onHostDestroy() {
        Log.i(TAG, "host destroyed");
        ReactApplicationContext context = getReactApplicationContext();
        try {
            context.unbindService(connection);
        } catch (IllegalArgumentException e) {
            pdService = null;
        }
    }

    private void loadLibraries() {
        ReactApplicationContext context = getReactApplicationContext();
        AssetManager assetManager = context.getAssets();

        try {
            File dest = context.getFilesDir();
            IoUtils.extractZipResource(assetManager.open("pd/patches.zip"), dest, true);
            PdBase.addToSearchPath(dest.getAbsolutePath());
            PdBase.addToSearchPath(dest.getAbsolutePath() + "/lib");
            Log.i(TAG, "patches extracted");
        } catch (IOException e) {
            Log.e(TAG, "Failed to load assets", e);
        }
    }

    @ReactMethod
    public void loadPatch(String patchSource, Promise promise) {
        if (pdService == null) {
            promise.reject("Load patch error", "PdService not started");
            return;
        }

        ReactApplicationContext context = getReactApplicationContext();
        File patch = null;

        try {
            InputStream stream = new ByteArrayInputStream(patchSource.getBytes(StandardCharsets.UTF_8));
            patch = IoUtils.extractResource(stream, "patch.pd", context.getCacheDir());

            int patchId = PdBase.openPatch(patch);
            PdBase.setReceiver(receiver);
            Log.d(TAG, "PatchID = " + patchId);
            promise.resolve(patchId);
        } catch (IOException e) {
            Log.e(TAG, e.getMessage());
            promise.reject("Load Patch error", e);
        } finally {
            if (patch != null)
                patch.delete();
        }
    }

    @ReactMethod
    public void startAudio(ReadableMap options) {
        if (pdService == null)
            return;

        int sampleRate = options.getInt("sampleRate");
        int inChannels = options.getInt("inChannels");
        int outChannels = options.getInt("outChannels");

        ReactApplicationContext context = getReactApplicationContext();
        try {
            pdService.initAudio(sampleRate, inChannels, outChannels, -1);

            // start with foreground privileges
            Intent intent = new Intent(context, PureDataModule.class);
            pdService.startAudio(intent, R.mipmap.ic_launcher, "GaiaSenses", "Return to GaiaSenses");
        } catch (IOException e) {
            Log.e(TAG, e.getMessage());
        }
    }

    @ReactMethod
    public void stopAudio() {
        if (pdService != null)
            pdService.stopAudio();
    }

    @ReactMethod
    public void destroyAudio() {
        if (pdService != null)
            pdService.release();
    }

    @ReactMethod
    public void send(String symbol, double value) {
        PdBase.sendFloat(symbol, (float) value);
    }

    @ReactMethod
    public void sendBang(String symbol) {
        Log.d(TAG, "SendBang to symbol '" + symbol + "'");
        PdBase.sendBang(symbol);
    }
}
