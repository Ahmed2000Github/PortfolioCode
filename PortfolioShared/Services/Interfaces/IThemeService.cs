using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PortfolioShared.Services.Interfaces
{
    internal interface IThemeService
    {
        public bool IsDarkMode { get; set; }
        public event Action OnChange;
        void SetDarkMode(bool darkMode);
    }
}
