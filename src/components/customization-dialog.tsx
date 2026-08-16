"use client";

import { useState } from "react";
import { getResourceApplicationLink } from "@/lib/site-content";
import { useLanguage } from "@/lib/i18n";

type CustomizationLauncherProps = {
  buttonLabel?: string;
  className?: string;
};

type CustomizationDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function CustomizationLauncher({
  buttonLabel = "提交定制需求",
  className = "primary-action primary-action--inline",
}: CustomizationLauncherProps) {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {language === "en" ? "Submit a Data Customization Request" : buttonLabel}
      </button>
      {open ? <CustomizationDialog open={open} onClose={() => setOpen(false)} /> : null}
    </>
  );
}

function CustomizationDialog({ open, onClose }: CustomizationDialogProps) {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  if (!open) {
    return null;
  }

  return (
    <div className="dialog-backdrop" role="presentation" onClick={onClose}>
      <section
        className="dialog-panel dialog-panel--customization"
        role="dialog"
        aria-modal="true"
        aria-labelledby="customization-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="dialog-panel__header">
          <div>
            <h3 id="customization-dialog-title">{isEnglish ? "Data Customization Request" : "数据定制需求"}</h3>
            <p className="dialog-panel__subtext">
              {isEnglish ? "Describe your request for evaluation and follow-up" : "提交需求说明，用于需求评估与联系确认"}
            </p>
          </div>
          <button type="button" className="dialog-panel__close" onClick={onClose} aria-label={isEnglish ? "Close" : "关闭"}>
            ×
          </button>
        </div>

        <div className="dialog-panel__body">
          <div className="download-form">
            <section className="customization-panel">
              <strong>{isEnglish ? "Request Details" : "需求说明"}</strong>
              <p>
                {isEnglish
                  ? "Use the Wenjuanxing form to describe the requested data, application, delivery requirements, and contact details. This website does not store the form; the group will contact you based on your submission."
                  : "请通过问卷星概述数据内容、应用场景、交付要求和联系方式。本站不保存需求表单，团队将根据问卷内容联系确认。"}
              </p>
            </section>

            <a
              className="primary-action"
              href={getResourceApplicationLink("data-customization", language)}
              target="_blank"
              rel="noreferrer"
            >
              {isEnglish ? "Open Request Form" : "打开定制需求表"}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
