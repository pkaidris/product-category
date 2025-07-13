import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { NINInputField } from "./NINInputField";
import { ArrowLeft, Shield, Lock } from "lucide-react";

interface NINVerificationFormProps {
  onSubmit: (nin: string) => void;
  onBack: () => void;
  isLoading?: boolean;
}

export function NINVerificationForm({ onSubmit, onBack, isLoading }: NINVerificationFormProps) {
  const [nin, setNin] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  const validateNIN = (ninValue: string): string => {
    if (!ninValue) return "NIN is required";
    if (ninValue.length !== 11) return "NIN must be exactly 11 digits";
    if (!/^\d{11}$/.test(ninValue)) return "NIN must contain only numbers";
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateNIN(nin);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    if (!consent) {
      setError("Please agree to share your NIN for verification");
      return;
    }
    
    setError("");
    onSubmit(nin);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-[var(--nimc-text)] hover:text-[var(--nimc-dark)]"
            disabled={isLoading}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <Card>
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-[var(--nimc-primary)]/10 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-[var(--nimc-primary)]" />
            </div>
            <CardTitle className="text-[var(--nimc-dark)]">Identity Verification</CardTitle>
            <CardDescription className="text-[var(--nimc-text)]">
              Enter your National Identification Number (NIN) to verify your identity with NIMC.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <NINInputField
                value={nin}
                onChange={setNin}
                error={error && !nin ? error : ""}
                disabled={isLoading}
              />
              
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="consent" 
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(checked === true)}
                  disabled={isLoading}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="consent"
                    className="text-sm text-[var(--nimc-text)] leading-relaxed cursor-pointer"
                  >
                    I agree to share my NIN for identity verification. Read our{" "}
                    <a href="#" className="text-[var(--nimc-primary)] hover:underline">
                      Privacy Policy
                    </a>{" "}
                    to understand how we protect your data.
                  </label>
                </div>
              </div>

              {error && error !== validateNIN(nin) && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}

              <Button 
                type="submit" 
                className="w-full bg-[var(--nimc-primary)] hover:bg-[var(--nimc-primary)]/90 text-white"
                disabled={isLoading || !nin || !consent}
              >
                {isLoading ? "Verifying..." : "Submit for Verification"}
              </Button>

              <div className="flex items-center gap-2 text-xs text-[var(--nimc-text)] bg-gray-50 p-3 rounded-lg">
                <Lock className="w-4 h-4" />
                <span>Your NIN is encrypted end-to-end and processed securely through official NIMC channels.</span>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}