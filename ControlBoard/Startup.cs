using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace ControlBoard
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddRouting();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            var routeBuilder = new RouteBuilder(app);
            routeBuilder.MapPut("cmd/{*cmd}", context =>
            {
                var cmd = context.GetRouteValue("cmd");
                var response = CmdHandler.RunCommand(context, (string)cmd);
                return context.Response.WriteAsync(response);
            });

            routeBuilder.MapPut("ps/{server}/{*cmd}", context =>
            {
                var cmd = context.GetRouteValue("cmd");
                var server = context.GetRouteValue("server");
                var response = PsHandler.RunCommand(context, (string)server, (string)cmd);
                return context.Response.WriteAsync(response);
            });

            routeBuilder.MapPut("osc/{server}/{*cmd}", context =>
            {
                var cmd = context.GetRouteValue("cmd");
                var server = context.GetRouteValue("server");
                var value = context.Request.Query["v"];
                var response = OscHandler.RunCommand(context, (string)server, (string)cmd, (string) value);
                return context.Response.WriteAsync(response);
            });

            app.UseRouter(routeBuilder.Build());


            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Hello World!");
            });
        }
    }
}
