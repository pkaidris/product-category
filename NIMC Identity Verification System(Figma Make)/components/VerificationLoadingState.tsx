import { Card, CardContent } from "./ui/card";
import { Loader2, Shield, CheckCircle2, UserCheck } from "lucide-react";

export function VerificationLoadingState() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Card>
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <div className="relative">
              <div className="mx-auto w-20 h-20 bg-[var(--nimc-primary)]/10 rounded-full flex items-center justify-center">
                <Shield className="w-10 h-10 text-[var(--nimc-primary)]" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Loader2 className="w-8 h-8 text-[var(--nimc-primary)] animate-spin" />
              </div>
            </div>
            
            <div className="space-y-3">
              <h2 className="text-xl text-[var(--nimc-dark)]">
                Verifying your identity...
              </h2>
              <p className="text-[var(--nimc-text)]">
                We're securely checking your details with NIMC. This usually takes a few moments.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-[var(--nimc-text)]">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>NIN format validated</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--nimc-text)]">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Connecting to NIMC database</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--nimc-text)]">
                <Loader2 className="w-5 h-5 text-[var(--nimc-primary)] animate-spin" />
                <span>Verifying identity details</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-xs text-[var(--nimc-text)]">
                Please do not close this window. Verification typically completes within 30 seconds.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}