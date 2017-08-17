import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import helpers.*;

public class CheckDup extends HttpServlet {
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException {

	response.setContentType("text/html");
        PrintWriter out = response.getWriter();
	
	if(!helpers.AuthHelper.isValidSession(request)) {
		out.print("not_authorized");	
		return;
		}
	String sku = request.getParameter("sku");
	String query = "SELECT * from product WHERE sku=\"" + sku + "\"";
	Vector<String []> tmp = DBHelper.doQuery(query);
	if(tmp.size() == 0)
		out.print("ok");
	else
		out.print("duplicate");	
    	}
    
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    	doGet(request, response);
    }  
}



