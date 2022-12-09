export class ToolBox {
    public static  humanReadDate(date: Date):string{
        const d = new Date(date);
        return d.toLocaleDateString("fr-FR", {month: 'long', day: 'numeric', year: 'numeric'});
      }

      public static getIdFromUrl(url: string): number{
        return parseInt(url.split('/').pop()!);
      }

      public static RandomString(length: number): string{
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }
}