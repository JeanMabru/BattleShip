package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 * Servlet implementation class MyServlet
 */
@WebServlet("/MyServlet")
public class MyServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MyServlet() {
        super();

        // TODO Auto-generated constructor stub
    }
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().print("le test a réussi ! ");
		//response.getWriter().print(request.getParameter("pseudo"));
		
	//	JSONArray rep=request.getParameter("pseudo");
		
	/*	if(rep != null && !rep.equals("")){
			Stock.setMessage(rep);
		}
		response.getWriter().print(Stock.getMessage());*/
		
		
		
		
		
		JSONObject JSON_Test = new JSONObject();
		JSONObject JSON_Test2 = new JSONObject();

		JSON_Test.put("x",10);
		JSON_Test.put("y",10);
		JSON_Test.put("status", 0);
		
		JSONArray map = new JSONArray();
		map.add(JSON_Test);
		JSON_Test2.put("x",1);
		JSON_Test2.put("y", 1);
		JSON_Test2.put("status", 1);
		map.add(JSON_Test2);
		
		//JSONArray map = getmap();
		
		response.setContentType("application/json");
		response.getWriter().print(map.toString());

	}

	/*private JSONArray getmap() { 
		// TODO Auto-generated method stub
		
		
		
		//[[{x:0,y:0,state:"toucher"},{x:1,y:0,state:"vide"}]
		
		// CODE DU MAIN DE CASE
		return myjson;
	}*/

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
