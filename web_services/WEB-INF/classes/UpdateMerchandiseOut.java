import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import helpers.*;

public class UpdateMerchandiseOut extends HttpServlet {
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
	String date = request.getParameter("date");
	String qty = request.getParameter("qty");
	
	String query = "INSERT INTO merchandise_out(sku,date,quantity) VALUES('"+sku+"','"+date+"',"+qty+")";
    	

	int answer = DBHelper.doUpdate(query);
	
	out.print(answer);
    	}
    
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    	doGet(request, response);
    }  
}



