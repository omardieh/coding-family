export interface IDBService {
  connectDB(): Promise<void>;
  closeDB(): Promise<void>;
}
