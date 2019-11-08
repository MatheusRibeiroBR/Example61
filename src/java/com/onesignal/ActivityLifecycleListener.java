package com.onesignal;

import android.app.Activity;
import android.app.Application;
import android.app.Application.ActivityLifecycleCallbacks;
import android.content.ComponentCallbacks;
import android.content.res.Configuration;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;

class ActivityLifecycleListener implements ActivityLifecycleCallbacks {
   @Nullable
   private static ComponentCallbacks configuration;
   @Nullable
   private static ActivityLifecycleListener instance;

   static void registerActivityLifecycleCallbacks(@NonNull Application var0) {
      if (instance == null) {
         instance = new ActivityLifecycleListener();
         var0.registerActivityLifecycleCallbacks(instance);
      }

      if (configuration == null) {
         configuration = new ComponentCallbacks() {
            public void onConfigurationChanged(Configuration var1) {
               ActivityLifecycleHandler.onConfigurationChanged(var1);
            }

            public void onLowMemory() {
            }
         };
         var0.registerComponentCallbacks(configuration);
      }

   }

   public void onActivityCreated(Activity var1, Bundle var2) {
      ActivityLifecycleHandler.onActivityCreated(var1);
   }

   public void onActivityDestroyed(Activity var1) {
      ActivityLifecycleHandler.onActivityDestroyed(var1);
   }

   public void onActivityPaused(Activity var1) {
      ActivityLifecycleHandler.onActivityPaused(var1);
   }

   public void onActivityResumed(Activity var1) {
      ActivityLifecycleHandler.onActivityResumed(var1);
   }

   public void onActivitySaveInstanceState(Activity var1, Bundle var2) {
   }

   public void onActivityStarted(Activity var1) {
      ActivityLifecycleHandler.onActivityStarted(var1);
   }

   public void onActivityStopped(Activity var1) {
      ActivityLifecycleHandler.onActivityStopped(var1);
   }
}
