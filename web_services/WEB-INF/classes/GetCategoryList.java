import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import helpers.*;

public class GetCategoryList extends HttpServlet {


    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException  {

	response.setContentType("text/html");
        PrintWriter out = response.getWriter();
		
	if(!helpers.AuthHelper.isValidSession(request)) {
		out.print("not_authorized");	
		return;
		}	
	
	String query = "select categoryID, name from category";
	Vector<String []> tmp = DBHelper.doQuery(query);
	String answer = "";
	for(int i=0; i < tmp.size(); i++) {
		String [] s = tmp.elementAt(i);
		answer += s[0] + "=" + s[1];
		answer +=  "||";
		}
	answer = answer.substring(0, answer.length()-2);
	out.println(answer);
			
	
    }
    
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    	doGet(request, response);
    }  
}



