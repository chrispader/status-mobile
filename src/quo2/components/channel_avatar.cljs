(ns quo2.components.channel-avatar
  (:require
   [quo2.foundations.colors :as colors]
   [quo2.components.icon :as icon]
   [quo.react-native :as rn]))

(def sizes
  {:icon {:small 11
          :large 15}
   :container {:small 24
               :large 32}
   :lock-circle 16
   :lock-icon 7})

(defn channel-avatar [_]
  (fn [{:keys [icon size lock]}]
    (let [container-size (get-in sizes [:container size])
          icon-size (get-in sizes [:icon size])]
      [rn/view {:width container-size
                :height container-size
                :align-items :center
                :justify-content :center
                :border-radius (/ container-size 2)
                :background-color (colors/primary-10)}
       [icon/icon icon {:size icon-size}]
       (when (exists? lock)
         [rn/view {:style {:width (:lock-circle sizes)}}
          [icon/icon icon {:size (:lock-icon sizes)}]])])))
