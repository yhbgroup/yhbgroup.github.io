"use client";

import { useState } from "react";
import { externalWorkflowLinks } from "@/lib/site-content";

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

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {buttonLabel}
      </button>
      {open ? <CustomizationDialog open={open} onClose={() => setOpen(false)} /> : null}
    </>
  );
}

function CustomizationDialog({ open, onClose }: CustomizationDialogProps) {
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
            <h3 id="customization-dialog-title">数据定制需求</h3>
            <p className="dialog-panel__subtext">提交需求说明，用于需求评估与联系确认</p>
          </div>
          <button type="button" className="dialog-panel__close" onClick={onClose} aria-label="关闭">
            ×
          </button>
        </div>

        <div className="dialog-panel__body">
          <div className="download-form">
            <section className="customization-panel">
              <strong>需求说明</strong>
              <p>
                请通过问卷星概述数据内容、应用场景、交付要求和联系方式。
                本站不保存需求表单，团队将根据问卷内容联系确认。
              </p>
            </section>

            <a
              className="primary-action"
              href={externalWorkflowLinks.customizationSurveyUrl}
              target="_blank"
              rel="noreferrer"
            >
              打开定制需求表
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
