import { Check, Clock, X, AlertCircle } from "lucide-react";
import { Badge } from "./ui/badge";

interface VerificationBadgeProps {
  status: "verified" | "pending" | "failed" | "unverified";
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function VerificationBadge({ status, showText = true, size = "md" }: VerificationBadgeProps) {
  const sizeClasses = {
    sm: "h-4 w-4 text-xs",
    md: "h-5 w-5 text-sm",
    lg: "h-6 w-6 text-base"
  };

  const iconSize = {
    sm: 12,
    md: 14,
    lg: 16
  };

  const getBadgeContent = () => {
    switch (status) {
      case "verified":
        return {
          icon: <Check size={iconSize[size]} />,
          text: "Verified by NIMC",
          className: "bg-green-100 text-green-800 border-green-200",
          iconColor: "text-green-600"
        };
      case "pending":
        return {
          icon: <Clock size={iconSize[size]} />,
          text: "Verification Pending",
          className: "bg-yellow-100 text-yellow-800 border-yellow-200",
          iconColor: "text-yellow-600"
        };
      case "failed":
        return {
          icon: <X size={iconSize[size]} />,
          text: "Verification Failed",
          className: "bg-red-100 text-red-800 border-red-200",
          iconColor: "text-red-600"
        };
      default:
        return {
          icon: <AlertCircle size={iconSize[size]} />,
          text: "Unverified",
          className: "bg-gray-100 text-gray-800 border-gray-200",
          iconColor: "text-gray-600"
        };
    }
  };

  const badgeContent = getBadgeContent();

  return (
    <Badge variant="outline" className={`${badgeContent.className} ${sizeClasses[size]} flex items-center gap-1`}>
      <span className={badgeContent.iconColor}>{badgeContent.icon}</span>
      {showText && <span>{badgeContent.text}</span>}
    </Badge>
  );
}