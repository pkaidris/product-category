import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle2, XCircle, RefreshCw, Home } from "lucide-react";

interface VerificationResultScreenProps {
  success: boolean;
  message?: string;
  onRetry?: () => void;
  onContinue: () => void;
  canRetry?: boolean;
  retryDisabled?: boolean;
  retryCountdown?: number;
}

export function VerificationResultScreen({ 
  success, 
  message, 
  onRetry, 
  onContinue, 
  canRetry = false,
  retryDisabled = false,
  retryCountdown = 0
}: VerificationResultScreenProps) {
  const successContent = {
    icon: <CheckCircle2 className="w-16 h-16 text-green-600" />,
    title: "Identity Verified!",
    description: message || "You've been successfully verified by NIMC. Your profile is now trusted and you have access to all premium features.",
    bgColor: "bg-green-50",
    buttonText: "Continue to Profile"
  };

  const failureContent = {
    icon: <XCircle className="w-16 h-16 text-red-500" />,
    title: "Verification Failed",
    description: message || "We couldn't verify your identity with the provided NIN. Please check your NIN and try again.",
    bgColor: "bg-red-50",
    buttonText: "Back to Home"
  };

  const content = success ? successContent : failureContent;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Card>
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${content.bgColor}`}>
              {content.icon}
            </div>
            
            <div className="space-y-3">
              <h2 className="text-xl text-[var(--nimc-dark)]">
                {content.title}
              </h2>
              <p className="text-[var(--nimc-text)]">
                {content.description}
              </p>
            </div>

            {success && (
              <div className="bg-green-50 p-4 rounded-lg space-y-2">
                <p className="text-sm text-green-800">
                  ✓ Profile trust score increased
                </p>
                <p className="text-sm text-green-800">
                  ✓ Access to premium listings unlocked
                </p>
                <p className="text-sm text-green-800">
                  ✓ Priority support enabled
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Button 
                onClick={onContinue}
                className="w-full bg-[var(--nimc-primary)] hover:bg-[var(--nimc-primary)]/90 text-white"
              >
                <Home className="w-4 h-4 mr-2" />
                {content.buttonText}
              </Button>

              {!success && canRetry && (
                <Button 
                  variant="outline"
                  onClick={onRetry}
                  disabled={retryDisabled}
                  className="w-full text-[var(--nimc-text)] border-[var(--nimc-text)]/30"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {retryDisabled && retryCountdown > 0 
                    ? `Try again in ${Math.ceil(retryCountdown / 60)} min${Math.ceil(retryCountdown / 60) !== 1 ? 's' : ''}` 
                    : "Try Again"
                  }
                </Button>
              )}
            </div>

            {!success && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-[var(--nimc-text)]">
                  Common issues: Incorrect NIN, network connectivity, or temporary NIMC system maintenance.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}