import { Component, type ErrorInfo, type ReactNode } from "react";

import { getInitialLanguage, isLanguage } from "../lib/language";
import type { Language } from "../types/gabes";

interface ErrorBoundaryProps {
  app: "public" | "admin";
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

const ERROR_COPY: Record<
  Language,
  {
    title: string;
    publicMessage: string;
    adminMessage: string;
    reload: string;
  }
> = {
  en: {
    title: "Something went wrong",
    publicMessage:
      "We couldn't load this part of WE ARE GABÈS. Please reload the page to try again.",
    adminMessage:
      "We couldn't load the administration area. Please reload the page to try again.",
    reload: "Reload page",
  },
  ar: {
    title: "حدث خطأ ما",
    publicMessage:
      "تعذر تحميل هذا الجزء من نحن قابس. يرجى إعادة تحميل الصفحة والمحاولة مرة أخرى.",
    adminMessage:
      "تعذر تحميل منطقة الإدارة. يرجى إعادة تحميل الصفحة والمحاولة مرة أخرى.",
    reload: "إعادة تحميل الصفحة",
  },
  fr: {
    title: "Une erreur est survenue",
    publicMessage:
      "Nous n’avons pas pu charger cette partie de WE ARE GABÈS. Rechargez la page pour réessayer.",
    adminMessage:
      "Nous n’avons pas pu charger l’administration. Rechargez la page pour réessayer.",
    reload: "Recharger la page",
  },
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Application rendering failed.", error, errorInfo);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const documentLanguage =
      typeof document === "undefined"
        ? null
        : document.documentElement.lang || null;
    const language = isLanguage(documentLanguage)
      ? documentLanguage
      : getInitialLanguage();
    const copy = ERROR_COPY[language];
    const message =
      this.props.app === "admin" ? copy.adminMessage : copy.publicMessage;

    return (
      <main
        role="alert"
        className="grid min-h-screen place-items-center bg-[#060b14] px-6 text-stone-100"
      >
        <section className="max-w-lg text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-[#5eead4]">
            WE ARE GABÈS
          </p>
          <h1 className="mt-4 text-3xl font-semibold">{copy.title}</h1>
          <p className="mt-3 text-sm leading-6 text-stone-300">{message}</p>
          <button
            type="button"
            className="mt-6 rounded-lg bg-[#1f7d72] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#279487] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5eead4]"
            onClick={() => window.location.reload()}
          >
            {copy.reload}
          </button>
        </section>
      </main>
    );
  }
}
