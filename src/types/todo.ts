export type Todo = {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
  order: number; // ⬅️ جدید: برای مرتب‌سازی دستی
};
