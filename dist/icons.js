import { forwardRef } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/icons/AlertCircleIcon.tsx
var cx = (...parts) => parts.filter(Boolean).join(" ");
var Icon = forwardRef(function Icon2({ size = 16, label, className, children, ...rest }, ref) {
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true, focusable: "false" };
  return /* @__PURE__ */ jsx(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: cx("Tenet-Icon", `Tenet-Icon--size-${size}`, className),
      ...a11y,
      ...rest,
      children
    }
  );
});
var AlertCircleIcon = forwardRef(function AlertCircleIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ jsx("line", { x1: "12", x2: "12", y1: "8", y2: "12" }),
    /* @__PURE__ */ jsx("line", { x1: "12", x2: "12.01", y1: "16", y2: "16" })
  ] });
});
var AlertTriangleIcon = forwardRef(function AlertTriangleIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }),
    /* @__PURE__ */ jsx("path", { d: "M12 9v4" }),
    /* @__PURE__ */ jsx("path", { d: "M12 17h.01" })
  ] });
});
var ArchiveIcon = forwardRef(function ArchiveIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("rect", { width: "20", height: "5", x: "2", y: "3", rx: "1" }),
    /* @__PURE__ */ jsx("path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" }),
    /* @__PURE__ */ jsx("path", { d: "M10 12h4" })
  ] });
});
var ArrowDownIcon = forwardRef(function ArrowDownIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M12 5v14" }),
    /* @__PURE__ */ jsx("path", { d: "m19 12-7 7-7-7" })
  ] });
});
var ArrowLeftIcon = forwardRef(function ArrowLeftIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "m12 19-7-7 7-7" }),
    /* @__PURE__ */ jsx("path", { d: "M19 12H5" })
  ] });
});
var ArrowRightIcon = forwardRef(function ArrowRightIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M5 12h14" }),
    /* @__PURE__ */ jsx("path", { d: "m12 5 7 7-7 7" })
  ] });
});
var ArrowUpIcon = forwardRef(function ArrowUpIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "m5 12 7-7 7 7" }),
    /* @__PURE__ */ jsx("path", { d: "M12 19V5" })
  ] });
});
var BarChartIcon = forwardRef(function BarChartIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }),
    /* @__PURE__ */ jsx("path", { d: "M18 17V9" }),
    /* @__PURE__ */ jsx("path", { d: "M13 17V5" }),
    /* @__PURE__ */ jsx("path", { d: "M8 17v-3" })
  ] });
});
var BellIcon = forwardRef(function BellIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M10.268 21a2 2 0 0 0 3.464 0" }),
    /* @__PURE__ */ jsx("path", { d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" })
  ] });
});
var BookOpenIcon = forwardRef(function BookOpenIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M12 5v16" }),
    /* @__PURE__ */ jsx("path", { d: "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" })
  ] });
});
var BookmarkIcon = forwardRef(function BookmarkIcon2(props, ref) {
  return /* @__PURE__ */ jsx(Icon, { ref, ...props, children: /* @__PURE__ */ jsx("path", { d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" }) });
});
var CalendarIcon = forwardRef(function CalendarIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M8 2v3" }),
    /* @__PURE__ */ jsx("path", { d: "M16 2v3" }),
    /* @__PURE__ */ jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }),
    /* @__PURE__ */ jsx("path", { d: "M3 9h18" })
  ] });
});
var CheckIcon = forwardRef(function CheckIcon2(props, ref) {
  return /* @__PURE__ */ jsx(Icon, { ref, ...props, children: /* @__PURE__ */ jsx("path", { d: "M20 6 9 17l-5-5" }) });
});
var CheckCircleIcon = forwardRef(function CheckCircleIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ jsx("path", { d: "m16 9-5.5 5.5L8 12" })
  ] });
});
var ChevronDownIcon = forwardRef(function ChevronDownIcon2(props, ref) {
  return /* @__PURE__ */ jsx(Icon, { ref, ...props, children: /* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6" }) });
});
var ChevronLeftIcon = forwardRef(function ChevronLeftIcon2(props, ref) {
  return /* @__PURE__ */ jsx(Icon, { ref, ...props, children: /* @__PURE__ */ jsx("path", { d: "m15 18-6-6 6-6" }) });
});
var ChevronRightIcon = forwardRef(function ChevronRightIcon2(props, ref) {
  return /* @__PURE__ */ jsx(Icon, { ref, ...props, children: /* @__PURE__ */ jsx("path", { d: "m9 18 6-6-6-6" }) });
});
var ChevronUpIcon = forwardRef(function ChevronUpIcon2(props, ref) {
  return /* @__PURE__ */ jsx(Icon, { ref, ...props, children: /* @__PURE__ */ jsx("path", { d: "m18 15-6-6-6 6" }) });
});
var ClockIcon = forwardRef(function ClockIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ jsx("path", { d: "M12 6v6l4 2" })
  ] });
});
var ColumnsIcon = forwardRef(function ColumnsIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }),
    /* @__PURE__ */ jsx("path", { d: "M9 3v18" }),
    /* @__PURE__ */ jsx("path", { d: "M15 3v18" })
  ] });
});
var CopyIcon = forwardRef(function CopyIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }),
    /* @__PURE__ */ jsx("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
  ] });
});
var DownloadIcon = forwardRef(function DownloadIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M12 15V3" }),
    /* @__PURE__ */ jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
    /* @__PURE__ */ jsx("path", { d: "m7 10 5 5 5-5" })
  ] });
});
var ExternalLinkIcon = forwardRef(function ExternalLinkIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M15 3h6v6" }),
    /* @__PURE__ */ jsx("path", { d: "M10 14 21 3" }),
    /* @__PURE__ */ jsx("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" })
  ] });
});
var EyeIcon = forwardRef(function EyeIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" }),
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3" })
  ] });
});
var EyeOffIcon = forwardRef(function EyeOffIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" }),
    /* @__PURE__ */ jsx("path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242" }),
    /* @__PURE__ */ jsx("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" }),
    /* @__PURE__ */ jsx("path", { d: "m2 2 20 20" })
  ] });
});
var FileIcon = forwardRef(function FileIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" }),
    /* @__PURE__ */ jsx("path", { d: "M14 2v5a1 1 0 0 0 1 1h5" })
  ] });
});
var FileTextIcon = forwardRef(function FileTextIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" }),
    /* @__PURE__ */ jsx("path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }),
    /* @__PURE__ */ jsx("path", { d: "M10 9H8" }),
    /* @__PURE__ */ jsx("path", { d: "M16 13H8" }),
    /* @__PURE__ */ jsx("path", { d: "M16 17H8" })
  ] });
});
var FilterIcon = forwardRef(function FilterIcon2(props, ref) {
  return /* @__PURE__ */ jsx(Icon, { ref, ...props, children: /* @__PURE__ */ jsx("path", { d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" }) });
});
var FolderIcon = forwardRef(function FolderIcon2(props, ref) {
  return /* @__PURE__ */ jsx(Icon, { ref, ...props, children: /* @__PURE__ */ jsx("path", { d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" }) });
});
var GlobeIcon = forwardRef(function GlobeIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ jsx("path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" }),
    /* @__PURE__ */ jsx("path", { d: "M2 12h20" })
  ] });
});
var GridIcon = forwardRef(function GridIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("rect", { width: "7", height: "7", x: "3", y: "3", rx: "1" }),
    /* @__PURE__ */ jsx("rect", { width: "7", height: "7", x: "14", y: "3", rx: "1" }),
    /* @__PURE__ */ jsx("rect", { width: "7", height: "7", x: "14", y: "14", rx: "1" }),
    /* @__PURE__ */ jsx("rect", { width: "7", height: "7", x: "3", y: "14", rx: "1" })
  ] });
});
var HelpCircleIcon = forwardRef(function HelpCircleIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ jsx("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }),
    /* @__PURE__ */ jsx("path", { d: "M12 17h.01" })
  ] });
});
var HomeIcon = forwardRef(function HomeIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }),
    /* @__PURE__ */ jsx("path", { d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" })
  ] });
});
var ImageIcon = forwardRef(function ImageIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }),
    /* @__PURE__ */ jsx("circle", { cx: "9", cy: "9", r: "2" }),
    /* @__PURE__ */ jsx("path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" })
  ] });
});
var InboxIcon = forwardRef(function InboxIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12" }),
    /* @__PURE__ */ jsx("path", { d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" })
  ] });
});
var InfoIcon = forwardRef(function InfoIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ jsx("path", { d: "M12 16v-4" }),
    /* @__PURE__ */ jsx("path", { d: "M12 8h.01" })
  ] });
});
var LayoutDashboardIcon = forwardRef(function LayoutDashboardIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("rect", { width: "7", height: "9", x: "3", y: "3", rx: "1" }),
    /* @__PURE__ */ jsx("rect", { width: "7", height: "5", x: "14", y: "3", rx: "1" }),
    /* @__PURE__ */ jsx("rect", { width: "7", height: "9", x: "14", y: "12", rx: "1" }),
    /* @__PURE__ */ jsx("rect", { width: "7", height: "5", x: "3", y: "16", rx: "1" })
  ] });
});
var LinkIcon = forwardRef(function LinkIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
    /* @__PURE__ */ jsx("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
  ] });
});
var ListIcon = forwardRef(function ListIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M3 5h.01" }),
    /* @__PURE__ */ jsx("path", { d: "M3 12h.01" }),
    /* @__PURE__ */ jsx("path", { d: "M3 19h.01" }),
    /* @__PURE__ */ jsx("path", { d: "M8 5h13" }),
    /* @__PURE__ */ jsx("path", { d: "M8 12h13" }),
    /* @__PURE__ */ jsx("path", { d: "M8 19h13" })
  ] });
});
var LockIcon = forwardRef(function LockIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" }),
    /* @__PURE__ */ jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
  ] });
});
var LogOutIcon = forwardRef(function LogOutIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "m16 17 5-5-5-5" }),
    /* @__PURE__ */ jsx("path", { d: "M21 12H9" }),
    /* @__PURE__ */ jsx("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" })
  ] });
});
var MailIcon = forwardRef(function MailIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" }),
    /* @__PURE__ */ jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" })
  ] });
});
var MapPinIcon = forwardRef(function MapPinIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" }),
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "10", r: "3" })
  ] });
});
var MenuIcon = forwardRef(function MenuIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M4 5h16" }),
    /* @__PURE__ */ jsx("path", { d: "M4 12h16" }),
    /* @__PURE__ */ jsx("path", { d: "M4 19h16" })
  ] });
});
var MessageSquareIcon = forwardRef(function MessageSquareIcon2(props, ref) {
  return /* @__PURE__ */ jsx(Icon, { ref, ...props, children: /* @__PURE__ */ jsx("path", { d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" }) });
});
var MinusIcon = forwardRef(function MinusIcon2(props, ref) {
  return /* @__PURE__ */ jsx(Icon, { ref, ...props, children: /* @__PURE__ */ jsx("path", { d: "M5 12h14" }) });
});
var MoonIcon = forwardRef(function MoonIcon2(props, ref) {
  return /* @__PURE__ */ jsx(Icon, { ref, ...props, children: /* @__PURE__ */ jsx("path", { d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" }) });
});
var MoreHorizontalIcon = forwardRef(function MoreHorizontalIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "1" }),
    /* @__PURE__ */ jsx("circle", { cx: "19", cy: "12", r: "1" }),
    /* @__PURE__ */ jsx("circle", { cx: "5", cy: "12", r: "1" })
  ] });
});
var MoreVerticalIcon = forwardRef(function MoreVerticalIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "1" }),
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "5", r: "1" }),
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "19", r: "1" })
  ] });
});
var NewspaperIcon = forwardRef(function NewspaperIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M15 18h-5" }),
    /* @__PURE__ */ jsx("path", { d: "M18 14h-8" }),
    /* @__PURE__ */ jsx("path", { d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" }),
    /* @__PURE__ */ jsx("rect", { width: "8", height: "4", x: "10", y: "6", rx: "1" })
  ] });
});
var PaperclipIcon = forwardRef(function PaperclipIcon2(props, ref) {
  return /* @__PURE__ */ jsx(Icon, { ref, ...props, children: /* @__PURE__ */ jsx("path", { d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" }) });
});
var PenLineIcon = forwardRef(function PenLineIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M13 21h8" }),
    /* @__PURE__ */ jsx("path", { d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" })
  ] });
});
var PencilIcon = forwardRef(function PencilIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" }),
    /* @__PURE__ */ jsx("path", { d: "m15 5 4 4" })
  ] });
});
var PieChartIcon = forwardRef(function PieChartIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" }),
    /* @__PURE__ */ jsx("path", { d: "M21.21 15.89A10 10 0 1 1 8 2.83" })
  ] });
});
var PlayIcon = forwardRef(function PlayIcon2(props, ref) {
  return /* @__PURE__ */ jsx(Icon, { ref, ...props, children: /* @__PURE__ */ jsx("path", { d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" }) });
});
var PlusIcon = forwardRef(function PlusIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M5 12h14" }),
    /* @__PURE__ */ jsx("path", { d: "M12 5v14" })
  ] });
});
var PrinterIcon = forwardRef(function PrinterIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" }),
    /* @__PURE__ */ jsx("path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" }),
    /* @__PURE__ */ jsx("rect", { x: "6", y: "14", width: "12", height: "8", rx: "1" })
  ] });
});
var QuoteIcon = forwardRef(function QuoteIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" }),
    /* @__PURE__ */ jsx("path", { d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" })
  ] });
});
var RefreshIcon = forwardRef(function RefreshIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }),
    /* @__PURE__ */ jsx("path", { d: "M21 3v5h-5" }),
    /* @__PURE__ */ jsx("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }),
    /* @__PURE__ */ jsx("path", { d: "M8 16H3v5" })
  ] });
});
var SearchIcon = forwardRef(function SearchIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "m21 21-4.34-4.34" }),
    /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" })
  ] });
});
var SendIcon = forwardRef(function SendIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" }),
    /* @__PURE__ */ jsx("path", { d: "m21.854 2.147-10.94 10.939" })
  ] });
});
var SettingsIcon = forwardRef(function SettingsIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }),
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3" })
  ] });
});
var ShareIcon = forwardRef(function ShareIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M12 2v13" }),
    /* @__PURE__ */ jsx("path", { d: "m16 6-4-4-4 4" }),
    /* @__PURE__ */ jsx("path", { d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" })
  ] });
});
var SortAscendingIcon = forwardRef(function SortAscendingIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "m3 8 4-4 4 4" }),
    /* @__PURE__ */ jsx("path", { d: "M7 4v16" }),
    /* @__PURE__ */ jsx("path", { d: "M11 12h4" }),
    /* @__PURE__ */ jsx("path", { d: "M11 16h7" }),
    /* @__PURE__ */ jsx("path", { d: "M11 20h10" })
  ] });
});
var SortDescendingIcon = forwardRef(function SortDescendingIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "m3 16 4 4 4-4" }),
    /* @__PURE__ */ jsx("path", { d: "M7 20V4" }),
    /* @__PURE__ */ jsx("path", { d: "M11 4h10" }),
    /* @__PURE__ */ jsx("path", { d: "M11 8h7" }),
    /* @__PURE__ */ jsx("path", { d: "M11 12h4" })
  ] });
});
var StarIcon = forwardRef(function StarIcon2(props, ref) {
  return /* @__PURE__ */ jsx(Icon, { ref, ...props, children: /* @__PURE__ */ jsx("path", { d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" }) });
});
var SunIcon = forwardRef(function SunIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "4" }),
    /* @__PURE__ */ jsx("path", { d: "M12 2v2" }),
    /* @__PURE__ */ jsx("path", { d: "M12 20v2" }),
    /* @__PURE__ */ jsx("path", { d: "m4.93 4.93 1.41 1.41" }),
    /* @__PURE__ */ jsx("path", { d: "m17.66 17.66 1.41 1.41" }),
    /* @__PURE__ */ jsx("path", { d: "M2 12h2" }),
    /* @__PURE__ */ jsx("path", { d: "M20 12h2" }),
    /* @__PURE__ */ jsx("path", { d: "m6.34 17.66-1.41 1.41" }),
    /* @__PURE__ */ jsx("path", { d: "m19.07 4.93-1.41 1.41" })
  ] });
});
var TableIcon = forwardRef(function TableIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M12 3v18" }),
    /* @__PURE__ */ jsx("rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }),
    /* @__PURE__ */ jsx("path", { d: "M3 9h18" }),
    /* @__PURE__ */ jsx("path", { d: "M3 15h18" })
  ] });
});
var TagIcon = forwardRef(function TagIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" }),
    /* @__PURE__ */ jsx("circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor" })
  ] });
});
var TrashIcon = forwardRef(function TrashIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M10 11v6" }),
    /* @__PURE__ */ jsx("path", { d: "M14 11v6" }),
    /* @__PURE__ */ jsx("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }),
    /* @__PURE__ */ jsx("path", { d: "M3 6h18" }),
    /* @__PURE__ */ jsx("path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })
  ] });
});
var TrendingDownIcon = forwardRef(function TrendingDownIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M16 17h6v-6" }),
    /* @__PURE__ */ jsx("path", { d: "m22 17-8.5-8.5-5 5L2 7" })
  ] });
});
var TrendingUpIcon = forwardRef(function TrendingUpIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M16 7h6v6" }),
    /* @__PURE__ */ jsx("path", { d: "m22 7-8.5 8.5-5-5L2 17" })
  ] });
});
var UnlockIcon = forwardRef(function UnlockIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" }),
    /* @__PURE__ */ jsx("path", { d: "M7 11V7a5 5 0 0 1 9.9-1" })
  ] });
});
var UploadIcon = forwardRef(function UploadIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M12 3v12" }),
    /* @__PURE__ */ jsx("path", { d: "m17 8-5-5-5 5" }),
    /* @__PURE__ */ jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" })
  ] });
});
var UserIcon = forwardRef(function UserIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "7", r: "4" })
  ] });
});
var UsersIcon = forwardRef(function UsersIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ jsx("path", { d: "M16 3.128a4 4 0 0 1 0 7.744" }),
    /* @__PURE__ */ jsx("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }),
    /* @__PURE__ */ jsx("circle", { cx: "9", cy: "7", r: "4" })
  ] });
});
var XIcon = forwardRef(function XIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M18 6 6 18" }),
    /* @__PURE__ */ jsx("path", { d: "m6 6 12 12" })
  ] });
});
var XCircleIcon = forwardRef(function XCircleIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ jsx("path", { d: "m15 9-6 6" }),
    /* @__PURE__ */ jsx("path", { d: "m9 9 6 6" })
  ] });
});
var ZoomInIcon = forwardRef(function ZoomInIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
    /* @__PURE__ */ jsx("line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65" }),
    /* @__PURE__ */ jsx("line", { x1: "11", x2: "11", y1: "8", y2: "14" }),
    /* @__PURE__ */ jsx("line", { x1: "8", x2: "14", y1: "11", y2: "11" })
  ] });
});
var ZoomOutIcon = forwardRef(function ZoomOutIcon2(props, ref) {
  return /* @__PURE__ */ jsxs(Icon, { ref, ...props, children: [
    /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
    /* @__PURE__ */ jsx("line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65" }),
    /* @__PURE__ */ jsx("line", { x1: "8", x2: "14", y1: "11", y2: "11" })
  ] });
});

export { AlertCircleIcon, AlertTriangleIcon, ArchiveIcon, ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, BarChartIcon, BellIcon, BookOpenIcon, BookmarkIcon, CalendarIcon, CheckCircleIcon, CheckIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ClockIcon, ColumnsIcon, CopyIcon, DownloadIcon, ExternalLinkIcon, EyeIcon, EyeOffIcon, FileIcon, FileTextIcon, FilterIcon, FolderIcon, GlobeIcon, GridIcon, HelpCircleIcon, HomeIcon, Icon, ImageIcon, InboxIcon, InfoIcon, LayoutDashboardIcon, LinkIcon, ListIcon, LockIcon, LogOutIcon, MailIcon, MapPinIcon, MenuIcon, MessageSquareIcon, MinusIcon, MoonIcon, MoreHorizontalIcon, MoreVerticalIcon, NewspaperIcon, PaperclipIcon, PenLineIcon, PencilIcon, PieChartIcon, PlayIcon, PlusIcon, PrinterIcon, QuoteIcon, RefreshIcon, SearchIcon, SendIcon, SettingsIcon, ShareIcon, SortAscendingIcon, SortDescendingIcon, StarIcon, SunIcon, TableIcon, TagIcon, TrashIcon, TrendingDownIcon, TrendingUpIcon, UnlockIcon, UploadIcon, UserIcon, UsersIcon, XCircleIcon, XIcon, ZoomInIcon, ZoomOutIcon };
//# sourceMappingURL=icons.js.map
//# sourceMappingURL=icons.js.map