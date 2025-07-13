import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { IdentityPromptModal } from "./components/IdentityPromptModal";
import { ProfileVerificationSection } from "./components/ProfileVerificationSection";
import { NINVerificationForm } from "./components/NINVerificationForm";
import { VerificationLoadingState } from "./components/VerificationLoadingState";
import { VerificationResultScreen } from "./components/VerificationResultScreen";
import { AdminDashboard } from "./components/AdminDashboard";
import { VerificationBadge } from "./components/VerificationBadge";
import { User, Shield, Settings, Home } from "lucide-react";

type VerificationStatus =
  | "verified"
  | "pending"
  | "failed"
  | "unverified";
type AppFlow =
  | "home"
  | "verification"
  | "loading"
  | "result"
  | "admin";

interface UserProfile {
  username: string;
  email: string;
  verificationStatus: VerificationStatus;
  profileCompletion: number;
  trustScore: number;
}

export default function App() {
  const [currentFlow, setCurrentFlow] =
    useState<AppFlow>("home");
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    message?: string;
  } | null>(null);
  const [retryCountdown, setRetryCountdown] = useState(0);

  // Mock user profile data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: "john_doe",
    email: "john@example.com",
    verificationStatus: "unverified",
    profileCompletion: 60,
    trustScore: 45,
  });

  // Simulate retry cooldown
  useEffect(() => {
    if (retryCountdown > 0) {
      const timer = setTimeout(() => {
        setRetryCountdown(retryCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [retryCountdown]);

  // Show prompt modal for new users (simulation)
  useEffect(() => {
    if (userProfile.verificationStatus === "unverified") {
      const timer = setTimeout(() => {
        setShowPromptModal(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [userProfile.verificationStatus]);

  const handleVerificationSubmit = (nin: string) => {
    setCurrentFlow("loading");

    // Simulate API call delay
    setTimeout(() => {
      // Simulate random success/failure for demo
      const isSuccess = Math.random() > 0.3; // 70% success rate

      if (isSuccess) {
        setVerificationResult({
          success: true,
          message:
            "You've been successfully verified by NIMC. Your profile is now trusted and you have access to all premium features.",
        });
        setUserProfile((prev) => ({
          ...prev,
          verificationStatus: "verified",
          profileCompletion: 85,
          trustScore: 95,
        }));
      } else {
        setVerificationResult({
          success: false,
          message:
            "We couldn't verify your identity with the provided NIN. Please check your NIN and try again.",
        });
        setUserProfile((prev) => ({
          ...prev,
          verificationStatus: "failed",
        }));
        setRetryCountdown(300); // 5 minute cooldown
      }

      setCurrentFlow("result");
    }, 3000);
  };

  const handleRetryVerification = () => {
    setCurrentFlow("verification");
    setVerificationResult(null);
  };

  const handleBackToHome = () => {
    setCurrentFlow("home");
    setVerificationResult(null);
  };

  const startVerification = () => {
    setShowPromptModal(false);
    setCurrentFlow("verification");
  };

  // Render different flows
  if (currentFlow === "admin") {
    return <AdminDashboard />;
  }

  if (currentFlow === "verification") {
    return (
      <NINVerificationForm
        onSubmit={handleVerificationSubmit}
        onBack={handleBackToHome}
      />
    );
  }

  if (currentFlow === "loading") {
    return <VerificationLoadingState />;
  }

  if (currentFlow === "result" && verificationResult) {
    return (
      <VerificationResultScreen
        success={verificationResult.success}
        message={verificationResult.message}
        onRetry={handleRetryVerification}
        onContinue={handleBackToHome}
        canRetry={!verificationResult.success}
        retryDisabled={retryCountdown > 0}
        retryCountdown={retryCountdown}
      />
    );
  }

  // Main home interface
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="w-8 h-8 text-[var(--nimc-primary)]" />
            <h1 className="text-xl text-[var(--nimc-dark)]">
              RentHouse
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <VerificationBadge
              status={userProfile.verificationStatus}
              size="sm"
            />
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[var(--nimc-text)]" />
              <span className="text-[var(--nimc-dark)]">
                {userProfile.username}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-fit">
            <TabsTrigger
              value="profile"
              className="flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="verification"
              className="flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Verification
            </TabsTrigger>
            <TabsTrigger
              value="admin"
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Info */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[var(--nimc-dark)]">
                      Profile Information
                    </CardTitle>
                    <CardDescription className="text-[var(--nimc-text)]">
                      Manage your account details and
                      preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-[var(--nimc-text)]">
                          Username
                        </p>
                        <p className="text-[var(--nimc-dark)]">
                          {userProfile.username}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-[var(--nimc-text)]">
                          Email
                        </p>
                        <p className="text-[var(--nimc-dark)]">
                          {userProfile.email}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--nimc-text)]">
                        Account Type
                      </p>
                      <p className="text-[var(--nimc-dark)]">
                        {userProfile.verificationStatus ===
                        "verified"
                          ? "Verified User"
                          : "Standard User"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--nimc-text)]">
                        Member Since
                      </p>
                      <p className="text-[var(--nimc-dark)]">
                        January 2025
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Verification Section */}
              <div>
                <ProfileVerificationSection
                  verificationStatus={
                    userProfile.verificationStatus
                  }
                  onVerifyClick={startVerification}
                  profileCompletion={
                    userProfile.profileCompletion
                  }
                  trustScore={userProfile.trustScore}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="verification"
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-[var(--nimc-dark)]">
                  Verification Demo
                </CardTitle>
                <CardDescription className="text-[var(--nimc-text)]">
                  Experience the complete NIMC verification flow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => setShowPromptModal(true)}
                    variant="outline"
                    className="h-24 flex-col"
                  >
                    <Shield className="w-6 h-6 mb-2" />
                    Show Prompt Modal
                  </Button>
                  <Button
                    onClick={startVerification}
                    variant="outline"
                    className="h-24 flex-col"
                  >
                    <User className="w-6 h-6 mb-2" />
                    Start Verification
                  </Button>
                </div>
                <p className="text-sm text-[var(--nimc-text)]">
                  Click the buttons above to experience
                  different parts of the verification flow.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle className="text-[var(--nimc-dark)]">
                  Admin Dashboard
                </CardTitle>
                <CardDescription className="text-[var(--nimc-text)]">
                  Access the admin dashboard to manage
                  verification requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => setCurrentFlow("admin")}
                  className="bg-[var(--nimc-primary)] hover:bg-[var(--nimc-primary)]/90 text-white"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Open Admin Dashboard
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Identity Prompt Modal */}
      <IdentityPromptModal
        isOpen={showPromptModal}
        onClose={() => setShowPromptModal(false)}
        onVerifyClick={startVerification}
      />
    </div>
  );
}