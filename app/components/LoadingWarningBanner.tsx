"use client";

import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

export function LoadingWarningBanner() {
  const hasShown = useRef(false);

  useEffect(() => {
    if (hasShown.current) return;
    hasShown.current = true;

    toast('⚠️ Product loading may be slow as this is a demo site hosted on free hosting', {
      duration: 3000,
      position: 'top-center',
    });

    setTimeout(() => {
      toast('⚠️ عرض المنتجات قد يكون بطيئاً بسبب أن الموقع تجريبي ومرفوع على استضافة مجانية', {
        duration: 3000,
        position: 'top-center',
      });
    }, 3000);
  }, []);

  return null;
}
