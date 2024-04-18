namespace PortfolioShared.ViewModels
{
    internal class LastWorkVM
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageLink { get; set; }
        
        internal string FormatedDescription()
        {
            var elements = Description.Split("....");
            if (elements.Length > 1)
            {
                elements[1] = $"<a href=\"{elements[1]}\" target=\"_blank\" class=\"mud-typography mud-link mud-primary-text mud-link-underline-hover mud-typography-body1 custom-link\"><h6 class=\"mud-typography mud-typography-h6 mud-inherit-text\">Link</h6></a>";
            }
            var newDescription = "";
            foreach (var element in elements)
            {
                newDescription += element;
            }
            return newDescription;
        } 
    }
}
