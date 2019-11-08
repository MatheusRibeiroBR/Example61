package com.onesignal;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import com.amazon.device.messaging.ADMMessageHandlerBase;
import com.amazon.device.messaging.ADMMessageReceiver;
import com.onesignal.OneSignal.LOG_LEVEL;

public class ADMMessageHandler extends ADMMessageHandlerBase {
   public ADMMessageHandler() {
      super("ADMMessageHandler");
   }

   protected void onMessage(Intent var1) {
      Context var2 = this.getApplicationContext();
      Bundle var3 = var1.getExtras();
      if (!NotificationBundleProcessor.processBundleFromReceiver(var2, var3).processed()) {
         NotificationGenerationJob var4 = new NotificationGenerationJob(var2);
         var4.jsonPayload = NotificationBundleProcessor.bundleAsJSONObject(var3);
         NotificationBundleProcessor.ProcessJobForDisplay(var4);
      }
   }

   protected void onRegistered(String var1) {
      LOG_LEVEL var2 = LOG_LEVEL.INFO;
      StringBuilder var3 = new StringBuilder();
      var3.append("ADM registration ID: ");
      var3.append(var1);
      OneSignal.Log(var2, var3.toString());
      PushRegistratorADM.fireCallback(var1);
   }

   protected void onRegistrationError(String var1) {
      LOG_LEVEL var2 = LOG_LEVEL.ERROR;
      StringBuilder var3 = new StringBuilder();
      var3.append("ADM:onRegistrationError: ");
      var3.append(var1);
      OneSignal.Log(var2, var3.toString());
      if ("INVALID_SENDER".equals(var1)) {
         OneSignal.Log(LOG_LEVEL.ERROR, "Please double check that you have a matching package name (NOTE: Case Sensitive), api_key.txt, and the apk was signed with the same Keystore and Alias.");
      }

      PushRegistratorADM.fireCallback((String)null);
   }

   protected void onUnregistered(String var1) {
      LOG_LEVEL var2 = LOG_LEVEL.INFO;
      StringBuilder var3 = new StringBuilder();
      var3.append("ADM:onUnregistered: ");
      var3.append(var1);
      OneSignal.Log(var2, var3.toString());
   }

   public static class Receiver extends ADMMessageReceiver {
      public Receiver() {
         super(ADMMessageHandler.class);
      }
   }
}
