import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "../lib/queryClient";
import type { WaitlistEmail, InsertWaitlist, UpdatePriorityAccess } from "@shared/schema";

// Join waitlist mutation
export function useJoinWaitlist() {
  return useMutation({
    mutationFn: (data: InsertWaitlist) =>
      apiRequest<WaitlistEmail>("/waitlist", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waitlist-count"] });
    },
  });
}

// Update priority access mutation
export function useUpdatePriority() {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePriorityAccess }) =>
      apiRequest<WaitlistEmail>(`/waitlist/${id}/priority`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
  });
}

// Get waitlist count
export function useWaitlistCount() {
  return useQuery({
    queryKey: ["waitlist-count"],
    queryFn: () => apiRequest<{ count: number }>("/count"),
  });
}

// Validate referral code
export function useValidateReferral(code: string | null) {
  return useQuery({
    queryKey: ["referral", code],
    queryFn: () => apiRequest<{ valid: boolean; referrerEmail?: string }>(`/referral/${code}`),
    enabled: !!code,
  });
}
