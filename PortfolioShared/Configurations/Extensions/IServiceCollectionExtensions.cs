
using Microsoft.Extensions.DependencyInjection;
using MudBlazor;
using MudBlazor.Services;
using PortfolioShared.Services;
using PortfolioShared.Services.Interfaces;

namespace ChatAppShared.Configurations.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static void AddSharedServices(this IServiceCollection services)
        {
            services.AddMudServices();
            services.AddMudServices(config =>
            {
                config.SnackbarConfiguration.PositionClass = Defaults.Classes.Position.BottomLeft;
                config.SnackbarConfiguration.PreventDuplicates = false;
                config.SnackbarConfiguration.NewestOnTop = false;
                config.SnackbarConfiguration.ShowCloseIcon = true;
                config.SnackbarConfiguration.VisibleStateDuration = 5000;
                config.SnackbarConfiguration.HideTransitionDuration = 1000;
                config.SnackbarConfiguration.ShowTransitionDuration = 1000;
                config.SnackbarConfiguration.SnackbarVariant = Variant.Filled;
            });
            services.AddScoped(sp =>
                new HttpClient
                {
                    BaseAddress = new Uri("https://www.ahmed-portfolio.somee.com/")

                });

            services.AddScoped<IThemeService, ThemeService>();
        }
    }
}
