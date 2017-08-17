import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import helpers.*;

public class UpdateOnHand extends HttpServlet {
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException {

	response.setContentType("text/html");
	
        PrintWriter out = response.getWriter();
		if(!helpers.AuthHelper.isValidSession(request)) {
		out.print("not_authorized");	
		return;
		}
	
	String qty = request.getParameter("qty");
	String sku = request.getParameter("sku");
	String date = request.getParameter("date");
	String query = "Update on_hand set on_hand_quantity="+qty+",last_date_modified='"+date+"' where sku='"+sku+"';";
    	

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



