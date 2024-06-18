using PortfolioShared.Services.Interfaces;

namespace PortfolioShared.Services
{
    internal class ThemeService : IThemeService
    {
        public bool IsDarkMode { get; set; }
        public event Action? OnChange;


        void IThemeService.SetDarkMode(bool darkMode)
        {
            IsDarkMode = darkMode;
            OnChange?.Invoke();
        }
    }
}
