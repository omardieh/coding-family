export interface IBlockedIP {
  ipAddress: string;
  failedAttempts: number;
  blockedUntil: Date | null;
  lastAttempt: Date;
}
