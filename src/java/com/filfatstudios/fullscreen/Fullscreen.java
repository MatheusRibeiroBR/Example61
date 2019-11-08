package com.filfatstudios.fullscreen;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

public class Fullscreen extends CordovaPlugin {
   public boolean execute(String var1, JSONArray var2, CallbackContext var3) throws JSONException {
      if (var1.equals("on")) {
         this.cordova.getActivity().runOnUiThread(new Runnable() {
            public void run() {
               Fullscreen.this.cordova.getActivity().getWindow().clearFlags(2048);
               Fullscreen.this.cordova.getActivity().getWindow().getDecorView().setSystemUiVisibility(5894);
            }
         });
         var3.success();
         return true;
      } else if (var1.equals("off")) {
         this.cordova.getActivity().runOnUiThread(new Runnable() {
            public void run() {
               Fullscreen.this.cordova.getActivity().getWindow().getDecorView().setSystemUiVisibility(0);
            }
         });
         var3.success();
         return true;
      } else {
         var3.error("Error: Unknown action!");
         return false;
      }
   }
}
