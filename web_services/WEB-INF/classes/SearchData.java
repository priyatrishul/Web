import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import helpers.*;

public class SearchData extends HttpServlet {
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException {

	response.setContentType("text/html");
        PrintWriter out = response.getWriter(); 
	String word=request.getParameter("word");
	String query = "SELECT product.sku, vendor.name,category.name, vendorModel," +
    	"description,features,cost,retail,image,on_hand.on_hand_quantity from product, category, vendor,on_hand WHERE  "+
    	"category.categoryID = product.catID AND vendor.vendorID = product.venID AND on_hand.sku = product.sku and product.description "+
		" LIKE '%"+word+"%' or product.vendorModel LIKE '%"+word+"%' or "+
		"product.features LIKE '%"+word+"%' group by product.sku";		

	/*String answer = DBHelper.getQueryResultTable(DBHelper.doQuery(query));
	
	out.print(answer);*/
	Vector<String []> tmp = DBHelper.doQuery(query);
			String answer = "";
			for(int i=0; i < tmp.size(); i++) {
		String [] s = tmp.elementAt(i);
		answer += s[0] + "|" + s[1] + "|" + s[2]+ "|" + s[3]+ "|" + s[4]+ "|" + s[5]+ "|" + s[6]+ "|" + s[7]+ "|" + s[8] + "|" + s[9];
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



