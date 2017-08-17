import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class Hello extends HttpServlet {


    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
        HttpSession session = request.getSession(false);
        if(session == null) {
	    ServletContext context = getServletContext();	
	    RequestDispatcher dispatcher 
                = request.getRequestDispatcher("/jsp/login_err.jsp");	
	    dispatcher.forward(request, response);	        
            }
	response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        out.println("<html>");

        out.println("<body bgcolor=\"white\">");



        out.println("<h1>Hello from jadran.sdsu.edu!!!</h1>");
        out.println("Your session is valid, the id is " + session.getId()+"<br />");
        out.println("The following parameters were received:</br/>");
        Enumeration e = request.getParameterNames();
        out.println("The parameter KEY=VALUE pairs:<br />");
        out.println("<ul>");
        while(e.hasMoreElements()) {
            String key = (String) e.nextElement();
            String value = request.getParameter(key);
            out.println("<li>" + key + "=" + value + "</li>");
            }
        out.println("</ul>");
        out.println("</body>");
        out.println("</html>");
	
    }
    
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    	doGet(request, response);
    }  
}



