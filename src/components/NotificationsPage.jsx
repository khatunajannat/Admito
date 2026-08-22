import { Link } from "react-router-dom";

const notifications = {
  today: [
    {
      id: 1,
      title: "Merit list for Phase 1 published",
      message:
        "Check your application status to see if you've been shortlisted for the next round.",
      time: "2 min ago",
      cta: { label: "Check status", href: "/status" },
      unread: true,
    },
    {
      id: 2,
      title: "Document verification reminder",
      message:
        "Upload your NID and academic certificates before Aug 25 to avoid delays.",
      time: "1 hour ago",
      cta: { label: "Upload documents", href: "/documents" },
      unread: true,
    },
    {
      id: 3,
      title: "New circular: Fee payment deadline",
      message:
        "Session fee must be paid by Sep 5 to confirm your seat for 2026–27.",
      time: "5 hours ago",
      cta: { label: "View circular", href: "/circulars/fee-deadline" },
      unread: true,
    },
  ],
  earlier: [
    {
      id: 4,
      title: "Assessment schedule released",
      message: "Your entrance assessment is scheduled for Sep 20, 10:00 AM.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 5,
      title: "Welcome to Admito",
      message:
        "Your account has been created successfully. Complete your profile to get started.",
      time: "2 days ago",
      unread: false,
    },
    {
      id: 6,
      title: "Application received",
      message:
        "We've received your application for Session 2026–27. You'll be notified of updates here.",
      time: "3 days ago",
      unread: false,
    },
  ],
};

const bellIcon = (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
      clipRule="evenodd"
    />
  </svg>
);

function NotificationItem({ n }) {
  return (
    <div
      className={`relative flex gap-4 rounded-xl border border-slate-200 p-4 transition hover:shadow-md ${
        n.unread ? "bg-white" : "bg-white/60"
      }`}
    >
      {n.unread && (
        <span className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-[#FFD700]" />
      )}
      <div
        className={`ml-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          n.unread
            ? "bg-[#805827]/10 text-[#805827]"
            : "bg-slate-100 text-slate-400"
        }`}
      >
        {bellIcon}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <p
            className={`text-sm ${
              n.unread
                ? "font-semibold text-slate-800"
                : "font-medium text-slate-500"
            }`}
          >
            {n.title}
          </p>
          <span className="whitespace-nowrap text-xs text-slate-400">
            {n.time}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-500">{n.message}</p>
        {n.cta && (
          <Link
            to={n.cta.href}
            className="mt-2 inline-block text-xs font-semibold text-[#805827] hover:text-[#FFD700]"
          >
            {n.cta.label} →
          </Link>
        )}
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
      {/* Page header */}
      <div className="mx-auto max-w-3xl px-6 pb-6">
        <div className="mb-1 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-slate-800">
            Notifications
          </h1>
          <button className="text-sm font-semibold text-[#805827] transition hover:text-[#FFD700]">
            Mark all as read
          </button>
        </div>
        <p className="text-sm text-slate-500">
          Updates on your application, circulars, and important dates.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-6 flex items-center gap-2 border-b border-slate-200">
          <button className="-mb-px border-b-2 border-[#FFD700] px-4 py-2.5 text-sm font-semibold text-slate-800">
            All
          </button>
          <button className="px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-800">
            Unread
          </button>
          <button className="px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-800">
            Circulars
          </button>
          <button className="px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-800">
            Status
          </button>
        </div>
      </div>

      {/* Notification list */}
      <div className="mx-auto max-w-3xl space-y-3 px-6 pb-20">
        <p className="pb-1 pt-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Today
        </p>
        {notifications.today.map((n) => (
          <NotificationItem key={n.id} n={n} />
        ))}

        <p className="pb-1 pt-6 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Earlier
        </p>
        {notifications.earlier.map((n) => (
          <NotificationItem key={n.id} n={n} />
        ))}

        <div className="pt-6 text-center">
          <button className="rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-white">
            Load earlier notifications
          </button>
        </div>
      </div>
    </div>
  );
}
