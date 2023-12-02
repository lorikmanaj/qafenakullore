namespace Application
{
public interface ITestRepo
    {
        void Get();
    }

    public class TestRepo : ITestRepo
    {
        public void Get() { return; }
    }
}