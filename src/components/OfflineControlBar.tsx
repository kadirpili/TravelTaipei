import React, { useState } from 'react';
import { Language, UI_STRINGS } from '../data/translationsRu';
import { useOnlineStatus, usePWAInstall } from '../hooks/usePWAInstall';
import {
  Bookmark,
  Check,
  Download,
  HardDriveDownload,
  WifiOff,
  X,
} from 'lucide-react';

interface OfflineControlBarProps {
  totalPlacesCount: number;
  savedCount: number;
  savedOnly: boolean;
  swActive: boolean;
  onSyncOffline: () => Promise<void>;
  onShowSavedSpots: () => void;
  lang: Language;
}

export const OfflineControlBar: React.FC<OfflineControlBarProps> = ({
  totalPlacesCount,
  savedCount,
  savedOnly,
  swActive,
  onSyncOffline,
  onShowSavedSpots,
  lang,
}) => {
  const isOnline = useOnlineStatus();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [isSyncing, setIsSyncing] = useState(false);
  const [justSynced, setJustSynced] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  const t = UI_STRINGS[lang];

  const handleSyncClick = async () => {
    setIsSyncing(true);
    try {
      await onSyncOffline();
      setJustSynced(true);
      setTimeout(() => setJustSynced(false), 2500);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <>
      {/* Offline Connectivity Banner when exploring remote Taipei without cell service */}
      {!isOnline && (
        <div
          role="status"
          aria-live="polite"
          className="mb-2 rounded-xl bg-amber-900 text-white px-3.5 py-2 shadow-xs flex flex-wrap items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2 text-xs">
            <WifiOff className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <div>
              <span className="font-bold">{t.offlineActiveTitle}</span>
              <span className="text-amber-100">
                {t.offlineActiveDesc(totalPlacesCount, savedCount)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onShowSavedSpots}
            className="min-h-[32px] px-2.5 py-1 rounded-lg bg-white text-slate-900 hover:bg-amber-50 text-xs font-bold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
          >
            <Bookmark className="w-3 h-3 text-amber-700 fill-current" />
            <span>
              {savedOnly
                ? t.showingSavedOfflineBtn(savedCount)
                : t.browseSavedOfflineBtn(savedCount)}
            </span>
          </button>
        </div>
      )}

      {/* Compact inline offline sync & install controls */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={handleSyncClick}
          disabled={isSyncing}
          title={`${isOnline ? t.offlineReadyStatus : t.offlineCacheActiveStatus} · ${t.cachedSummary(totalPlacesCount, savedCount)}`}
          className="min-h-[38px] px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
        >
          {justSynced ? (
            <>
              <Check className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span className="text-teal-800 hidden xl:inline">{t.offlinePackCachedBtn}</span>
            </>
          ) : (
            <>
              <HardDriveDownload className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="hidden xl:inline">
                {isSyncing ? t.cachingBtn : lang === 'ru' ? 'Офлайн' : 'Offline'}
              </span>
            </>
          )}
        </button>

        {/* In-App Install Prompt Button */}
        {!isInstalled && isInstallable && (
          <button
            type="button"
            onClick={install}
            className="min-h-[38px] px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">{t.installAppBtn}</span>
          </button>
        )}

        {!isInstalled && !isInstallable && isIOS && (
          <button
            type="button"
            onClick={() => setShowIOSGuide(true)}
            className="min-h-[38px] px-2.5 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">{t.installIOSBtn}</span>
          </button>
        )}
      </div>

      {/* iOS Safari Add-to-Home-Screen Modal */}
      {showIOSGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ios-install-title"
          onClick={() => setShowIOSGuide(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-2">
              <h3
                id="ios-install-title"
                className="text-base font-bold text-slate-900"
              >
                {t.iosInstallTitle}
              </h3>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                aria-label="Close iOS install instructions"
                className="min-h-[36px] min-w-[36px] rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {t.iosInstallSteps}
            </p>
            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="mt-4 w-full min-h-[42px] rounded-xl bg-slate-900 text-white text-xs font-semibold"
            >
              {t.gotItBtn}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
