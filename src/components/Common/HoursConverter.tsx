export const convert24To12 =(time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const ampm = hours < 12 ? 'AM' : 'PM';
    const hours12 = hours % 12 || 12;
    const toReturn = `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    return toReturn;
  } 