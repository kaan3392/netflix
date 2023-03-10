import {
  onCurrentUserSubscriptionUpdate,
  Subscription,
} from "@stripe/firestore-stripe-payments";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { payments } from "../libs/stripe";

export default function useSubscription(user: User | null) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    if (!user) return;

    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      setSubscription(
        snapshot.subscriptions.filter(
          (subs) => subs.status === "active" || subs.status === "trialing"
        )[0]
      );
    });
  }, [user]);

  return subscription;
}
