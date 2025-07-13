import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Shield, Check, Clock } from "lucide-react";

interface IdentityPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerifyClick: () => void;
}

export function IdentityPromptModal({ isOpen, onClose, onVerifyClick }: IdentityPromptModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-[var(--nimc-primary)]/10 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-[var(--nimc-primary)]" />
          </div>
          <DialogTitle className="text-xl text-[var(--nimc-dark)]">
            Verify Your Identity
          </DialogTitle>
          <DialogDescription className="text-[var(--nimc-text)]">
            Complete your profile by verifying your identity with NIMC. This helps build trust in the RentHouse community.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span>Increase your profile trust score</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span>Access to premium listings</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span>Priority support and assistance</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-6">
          <Button 
            onClick={onVerifyClick}
            className="bg-[var(--nimc-primary)] hover:bg-[var(--nimc-primary)]/90 text-white"
          >
            Verify with NIN
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="text-[var(--nimc-text)] border-[var(--nimc-text)]/30"
          >
            Maybe Later
          </Button>
        </div>
        <p className="text-xs text-[var(--nimc-text)] text-center mt-4">
          Your data is encrypted and processed securely according to Nigerian data protection laws.
        </p>
      </DialogContent>
    </Dialog>
  );
}