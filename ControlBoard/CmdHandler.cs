using System;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;


namespace ControlBoard
{
    public class CmdHandler
    {
        public static string RunCommand(HttpContext context, string cmd)
        {
            if (!File.Exists(cmd))
            {
                return "Invalid file.";
            }

            // execute the cmd file
            cmd = Path.GetFullPath(cmd);
            var info = new ProcessStartInfo("c:\\windows\\system32\\cmd.exe", "/c " + cmd);
            info.WorkingDirectory = Environment.CurrentDirectory;
            var p = Process.Start(info);
            p.WaitForExit();
            return "Executed " + cmd;    
        }
    }
}
