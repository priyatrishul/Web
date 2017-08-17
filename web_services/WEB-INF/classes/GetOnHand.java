import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import helpers.*;

public class GetOnHand extends HttpServlet {
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
	String query = "SELECT sku, on_hand_quantity" +
    	" from on_hand WHERE sku=\'"+sku+"\' ";

	String answer = DBHelper.getQueryResultTable(DBHelper.doQuery(query));
	
	out.print(answer);
    	}
    
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    	doGet(request, response);
    }  
}



