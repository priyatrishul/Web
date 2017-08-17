/*  Template.java
    This is a template for Java servlets.
    Alan Riggins    
    CS596
    Spring 2010
 */

import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;



public class AjaxStatus extends HttpServlet {


    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        String account = request.getParameter("name");

        if(!account.startsWith("jadrn")) {
            writeErrorString(out,account);
            return;
            }
        String command = "ps -u " + account;
        Process child = Runtime.getRuntime().exec(command);
        InputStream in = child.getInputStream();
        int c;
        while((c = in.read()) != -1)
            out.print((char)c);
        in.close();
        try {
            child.waitFor();
            }
        catch(InterruptedException e) {
            writeErrorString(out, "Sorry, a runtime error occurred " +e);
            }
        }

    
   private void writeErrorString(PrintWriter out, String account) {
       out.print("Sorry, account " + account + " was not recognized");
       }
        
}



