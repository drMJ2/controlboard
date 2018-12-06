using System;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;


namespace ControlBoard
{
    public class OscHandler
    {
        public static string RunCommand(HttpContext context, string server, string cmd, string value)
        {
            var parts = cmd.Split('?');
            //var addr = parts[0];
            //var value = parts[1];
            Console.WriteLine("OSC: " + cmd + " " + value);
            return "Done.";
        }
    }
}
