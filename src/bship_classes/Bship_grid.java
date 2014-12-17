package bship_classes;

public class Bship_grid {

	private int i_Board_size;
	private int i_Current_score;
	
	public Bship_grid()
	{
		i_Board_size = 20;
		i_Current_score = 0;
	}
	
	public Bship_grid(int size, int score)
	{
		this.i_Board_size = size;
		this.i_Current_score = score;
	}

	public int getI_Board_size() {
		return i_Board_size;
	}

	public void setI_Board_size(int i_Board_size) {
		this.i_Board_size = i_Board_size;
	}

	public int getI_Current_score() {
		return i_Current_score;
	}

	public void setI_Current_score(int i_Current_score) {
		this.i_Current_score = i_Current_score;
	}
	
	
}
