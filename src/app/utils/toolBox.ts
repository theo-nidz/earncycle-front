export class ToolBox {
    public static  humanReadDate(date: Date):string{
        const d = new Date(date);
        return d.toLocaleDateString("fr-FR", {month: 'long', day: 'numeric', year: 'numeric'});
      }

      public static getIdFromUrl(url: string): number{
        return parseInt(url.split('/').pop()!);
      }
}