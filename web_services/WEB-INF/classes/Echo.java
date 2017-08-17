import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class Echo extends HttpServlet {

    private static final long serialVersionUID = 1L;

    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException  {
            response.setContentType("text/html");
            PrintWriter out = response.getWriter();
            
            // StringBuffer is much faster than concatenating
            // strings.
            StringBuffer b = new StringBuffer();
            b.append("<html>\n");
            b.append("<head>\n");
            b.append("<title>GoodBye World</title>\n");
            b.append("</head>\n");
            b.append("<body>\n");
            b.append("<h1>Parameters Received by the Server</h1>\n");
            Enumeration<String> e = request.getParameterNames();
            b.append("<table>\n");
            while(e.hasMoreElements()) {
                String key = e.nextElement();
                String value = request.getParameter(key);
                b.append("<tr>\n<td>"+key+"</td>\n<td>"+value+"</td>\n</tr>");
                }
            b.append("</table>\n");
            b.append("</body>\n");
            b.append("</html>\n");
            
            out.print(b.toString());
        }
        
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException  {
            doGet(request, response);
            }        
}



