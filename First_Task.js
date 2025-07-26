import java.util.ArrayList;
import java.util.List;

public class PowerOfTwoMaxHeap {
    private List<Integer> heap;
    private int numChildren;

    public PowerOfTwoMaxHeap(int numChildren) {
        if (numChildren < 0) {
            throw new IllegalArgumentException("Number of children must be non-negative.");
        }
        this.numChildren = numChildren;
        this.heap = new ArrayList<>();
    }

    public void insert(int value) {
        heap.add(value);
        siftUp(heap.size() - 1);
    }

    public int popMax() {
        if (heap.isEmpty()) {
            throw new IllegalStateException("Heap is empty.");
        }
        int max = heap.get(0);
        int lastIndex = heap.size() - 1;
        heap.set(0, heap.get(lastIndex));
        heap.remove(lastIndex);
        siftDown(0);
        return max;
    }

    private void siftUp(int index) {
        int parentIndex = (index - 1) / (numChildren + 1);
        while (index > 0 && heap.get(index) > heap.get(parentIndex)) {
            swap(index, parentIndex);
            index = parentIndex;
            parentIndex = (index - 1) / (numChildren + 1);
        }
    }

    private void siftDown(int index) {
        int largest = index;
        for (int i = 1; i <= numChildren; i++) {
            int childIndex = numChildren * index + i;
            if (childIndex < heap.size() && heap.get(childIndex) > heap.get(largest)) {
                largest = childIndex;
            }
        }
        if (largest != index) {
            swap(index, largest);
            siftDown(largest);
        }
    }

    private void swap(int i, int j) {
        int temp = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, temp);
    }

    public boolean isEmpty() {
        return heap.isEmpty();
    }

    public int size() {
        return heap.size();
    }

    public static void main(String[] args) {
        // Test the PowerOfTwoMaxHeap
        PowerOfTwoMaxHeap heap = new PowerOfTwoMaxHeap(2); // Each parent has 2^2 = 4 children
        heap.insert(10);
        heap.insert(20);
        heap.insert(5);
        heap.insert(30);
        heap.insert(15);

        System.out.println("Max value: " + heap.popMax()); // Should print 30
        System.out.println("Max value: " + heap.popMax()); // Should print 20
        System.out.println("Max value: " + heap.popMax()); // Should print 15
        System.out.println("Max value: " + heap.popMax()); // Should print 10
        System.out.println("Max value: " + heap.popMax()); // Should print 5
    }
}