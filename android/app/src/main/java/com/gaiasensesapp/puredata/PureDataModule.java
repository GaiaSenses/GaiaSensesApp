package com.gaiasensesapp.puredata;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import org.puredata.android.service.PdService;
import org.puredata.core.PdBase;
import org.puredata.core.utils.IoUtils;

import java.io.ByteArrayInputStream;
import java.io.File;
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
        }

        @Override
        public void onServiceDisconnected(ComponentName componentName) {
            // never called
        }
    };

    public PureDataModule(ReactApplicationContext context) {
        super(context);
        context.addLifecycleEventListener(this);

        Intent intent = new Intent(context, PdService.class);
        context.bindService(intent, connection, Context.BIND_AUTO_CREATE);
        //context.startService(intent);
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
            pdService.startAudio();
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
}
