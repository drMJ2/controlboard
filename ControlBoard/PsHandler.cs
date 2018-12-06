using System;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;


namespace ControlBoard
{
    public class PsHandler
    {
        public static string RunCommand(HttpContext context, string server, string cmd)
        {
            if (!File.Exists(cmd))
            {
                return "Invalid file.";
            }

            // execute the cmd file
            cmd = Path.GetFullPath(cmd);
            var info = new ProcessStartInfo(@"C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe", cmd);
            info.WorkingDirectory = Environment.CurrentDirectory;
            var p = Process.Start(info);
            p.WaitForExit();
            return "Executed " + cmd;    
        }
    }
}
