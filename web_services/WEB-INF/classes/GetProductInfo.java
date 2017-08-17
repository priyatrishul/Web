import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import helpers.*;

public class GetProductInfo extends HttpServlet {
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
	String query = "SELECT sku, vendor.vendorID,category.categoryID, vendorModel, " +
    	"description, image from product, category, vendor WHERE sku='"+sku+"' AND "+
    	"category.categoryID = product.catID AND vendor.vendorID = product.venID";

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



