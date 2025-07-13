import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { VerificationBadge } from "./VerificationBadge";
import { Progress } from "./ui/progress";
import { Shield, Star, Zap } from "lucide-react";

interface ProfileVerificationSectionProps {
  verificationStatus: "verified" | "pending" | "failed" | "unverified";
  onVerifyClick: () => void;
  profileCompletion?: number;
  trustScore?: number;
}

export function ProfileVerificationSection({ 
  verificationStatus, 
  onVerifyClick, 
  profileCompletion = 60,
  trustScore = 75
}: ProfileVerificationSectionProps) {
  const isVerified = verificationStatus === "verified";
  const isPending = verificationStatus === "pending";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-[var(--nimc-dark)]">
              <Shield className="w-5 h-5" />
              Identity Verification
            </CardTitle>
            <CardDescription className="text-[var(--nimc-text)]">
              {isVerified 
                ? "Your identity has been verified with NIMC"
                : "Verify your identity to unlock premium features"
              }
            </CardDescription>
          </div>
          <VerificationBadge status={verificationStatus} size="lg" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {isVerified ? (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-sm text-green-800 mb-2">Verification Benefits Active</h4>
              <div className="space-y-1">
                <p className="text-xs text-green-700">✓ Enhanced profile credibility</p>
                <p className="text-xs text-green-700">✓ Access to premium listings</p>
                <p className="text-xs text-green-700">✓ Priority customer support</p>
                <p className="text-xs text-green-700">✓ Reduced security restrictions</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="w-4 h-4 text-[var(--nimc-primary)]" />
                  <span className="text-sm text-[var(--nimc-dark)]">Trust Score</span>
                </div>
                <p className="text-lg text-[var(--nimc-primary)]">{trustScore}%</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-[var(--nimc-dark)]">Profile</span>
                </div>
                <p className="text-lg text-purple-600">{profileCompletion}%</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {isPending ? (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Your verification is being processed. This usually takes a few minutes.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[var(--nimc-text)]">Profile Completion</span>
                      <span className="text-[var(--nimc-dark)]">{profileCompletion}%</span>
                    </div>
                    <Progress value={profileCompletion} className="h-2" />
                  </div>
                  
                  <p className="text-sm text-[var(--nimc-text)]">
                    Complete identity verification to unlock premium features and increase your trust score.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 text-xs text-[var(--nimc-text)]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span>Access to premium listings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span>Enhanced profile credibility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span>Priority customer support</span>
                  </div>
                </div>

                <Button 
                  onClick={onVerifyClick}
                  className="w-full bg-[var(--nimc-primary)] hover:bg-[var(--nimc-primary)]/90 text-white"
                >
                  Verify with NIN
                </Button>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}