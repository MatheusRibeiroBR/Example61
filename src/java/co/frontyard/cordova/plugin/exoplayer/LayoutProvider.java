package co.frontyard.cordova.plugin.exoplayer;

import android.app.Activity;
import android.app.Dialog;
import android.util.DisplayMetrics;
import android.util.Log;
import android.util.TypedValue;
import android.view.View;
import android.view.WindowManager.LayoutParams;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import com.google.android.exoplayer2.ui.SimpleExoPlayerView;
import com.squareup.picasso.Picasso;
import org.json.JSONObject;

public class LayoutProvider {
   private static final String TAG = "ExoPlayerPlugin";

   private static View findView(View var0, Activity var1, String var2) {
      return var0.findViewById(var1.getResources().getIdentifier(var2, "id", var1.getPackageName()));
   }

   public static LayoutParams getDialogLayoutParams(Activity var0, Configuration var1, Dialog var2) {
      LayoutParams var3 = new LayoutParams();
      var3.copyFrom(var2.getWindow().getAttributes());
      JSONObject var5 = var1.getDimensions();
      if (var5 == null) {
         var3.width = -1;
         var3.height = -1;
         return var3;
      } else {
         DisplayMetrics var6 = var0.getResources().getDisplayMetrics();
         var3.x = (int)TypedValue.applyDimension(1, (float)var5.optInt("x", 0), var6);
         var3.y = (int)TypedValue.applyDimension(1, (float)var5.optInt("y", 0), var6);
         var3.width = (int)TypedValue.applyDimension(1, (float)var5.optInt("width", -1), var6);
         var3.height = (int)TypedValue.applyDimension(1, (float)var5.optInt("height", -1), var6);
         return var3;
      }
   }

   public static SimpleExoPlayerView getExoPlayer(Activity var0, Configuration var1) {
      SimpleExoPlayerView var2 = new SimpleExoPlayerView(var0);
      var2.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -1));
      if (var1.isAspectRatioFillScreen()) {
         var2.setResizeMode(3);
      }

      var2.setFastForwardIncrementMs(var1.getForwardTimeMs());
      var2.setRewindIncrementMs(var1.getRewindTimeMs());
      var2.setShowMultiWindowTimeBar(true);
      var2.setControllerHideOnTouch(true);
      var2.setControllerShowTimeoutMs(var1.getHideTimeout());
      setupController(var2, var0, var1.getController());
      return var2;
   }

   public static FrameLayout getMainLayout(Activity var0) {
      FrameLayout var1 = new FrameLayout(var0);
      var1.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -1));
      var1.setKeepScreenOn(true);
      return var1;
   }

   private static void setupBar(SimpleExoPlayerView var0, Activity var1, JSONObject var2) {
      String var3 = var2.optString("streamTitle", (String)null);
      String var4 = var2.optString("streamDescription", (String)null);
      String var5 = var2.optString("streamImage", (String)null);
      boolean var6 = var2.optBoolean("hideProgress");
      ImageView var7 = (ImageView)findView(var0, var1, "exo_image");
      TextView var8 = (TextView)findView(var0, var1, "exo_title");
      TextView var9 = (TextView)findView(var0, var1, "exo_subtitle");
      View var10 = findView(var0, var1, "exo_timebar");
      if (var5 != null) {
         Picasso.with(var7.getContext()).load(var5).into(var7);
      }

      if (var3 != null) {
         var8.setText(var3);
      }

      if (var4 != null && !var4.equals("null")) {
         var10.setVisibility(8);
         var9.setText(var4);
      } else if (var6) {
         var10.setVisibility(8);
         var9.setText(var4);
      } else {
         var9.setVisibility(8);
      }
   }

   private static void setupButtons(SimpleExoPlayerView var0, Activity var1, JSONObject var2) {
      var1.getPackageName();
      JSONObject var4 = var2.optJSONObject("controlIcons");
      if (var4 != null) {
         LayoutProvider.BUTTON[] var5 = LayoutProvider.BUTTON.values();
         int var6 = var5.length;

         for(int var7 = 0; var7 < var6; ++var7) {
            String var8 = var5[var7].name();
            if (var4.has(var8)) {
               ImageButton var9 = (ImageButton)findView(var0, var1, var8);
               if (var9 != null) {
                  String var15 = var4.optString(var8);
                  if (var15 == null) {
                     StringBuilder var16 = new StringBuilder();
                     var16.append("Hiding ");
                     var16.append(var8);
                     var16.append(" button");
                     Log.i("ExoPlayerPlugin", var16.toString());
                     var9.setVisibility(8);
                  } else {
                     StringBuilder var21 = new StringBuilder();
                     var21.append("Loading ");
                     var21.append(var8);
                     var21.append(" from ");
                     var21.append(var15);
                     Log.i("ExoPlayerPlugin", var21.toString());
                     Picasso.with(var9.getContext()).load(var15).into(var9);
                  }
               } else {
                  StringBuilder var10 = new StringBuilder();
                  var10.append("ImageButton ");
                  var10.append(var8);
                  var10.append(" not found!");
                  Log.e("ExoPlayerPlugin", var10.toString());
               }
            }
         }
      } else {
         ((LinearLayout)findView(var0, var1, "exo_buttons")).setVisibility(8);
      }

   }

   public static void setupController(SimpleExoPlayerView var0, Activity var1, JSONObject var2) {
      if (var2 != null) {
         var0.setUseController(true);
         setupButtons(var0, var1, var2);
         setupBar(var0, var1, var2);
      } else {
         var0.setUseController(false);
      }
   }

   private static enum BUTTON {
      exo_ffwd,
      exo_next,
      exo_pause,
      exo_play,
      exo_prev,
      exo_rew;

      static {
         LayoutProvider.BUTTON[] var0 = new LayoutProvider.BUTTON[]{exo_prev, exo_rew, exo_play, exo_pause, exo_ffwd, exo_next};
      }
   }
}
