const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const newsletterService = {
  async subscribe(email: string): Promise<{ success: boolean; message: string }> {
    await delay(800);
    if (!email.includes('@')) return { success: false, message: 'Invalid email address.' };
    return { success: true, message: 'You have successfully subscribed to GrabFree deals!' };
  },

  async unsubscribe(email: string): Promise<{ success: boolean }> {
    await delay(500);
    console.log('Unsubscribed:', email);
    return { success: true };
  },
};
