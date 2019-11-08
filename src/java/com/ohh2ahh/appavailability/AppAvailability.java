package com.ohh2ahh.appavailability;

import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

public class AppAvailability extends CordovaPlugin {
   private void checkAvailability(String var1, CallbackContext var2) {
      if (this.appInstalled(var1)) {
         var2.success();
      } else {
         var2.error("");
      }
   }

   public boolean appInstalled(String var1) {
      PackageManager var2 = this.cordova.getActivity().getApplicationContext().getPackageManager();

      try {
         var2.getPackageInfo(var1, 1);
         return true;
      } catch (NameNotFoundException var3) {
         return false;
      }
   }

   public boolean execute(String var1, JSONArray var2, CallbackContext var3) throws JSONException {
      if (var1.equals("checkAvailability")) {
         this.checkAvailability(var2.getString(0), var3);
         return true;
      } else {
         return false;
      }
   }
}
